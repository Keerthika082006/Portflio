import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, HelpCircle } from "lucide-react";

// Dimensions configured for different screens
const GRID_ROWS = 13;
const getCols = () => (window.innerWidth < 768 ? 15 : 29);

const generateGrid = (cols, start, end) => {
  const initialGrid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === start.row && col === start.col,
        isEnd: row === end.row && col === end.col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      });
    }
    initialGrid.push(currentRow);
  }
  return initialGrid;
};

export default function PathfindingVisualizer() {
  const [gridCols, setGridCols] = useState(getCols());
  const [startNode, setStartNode] = useState({ row: 3, col: 3 });
  const [endNode, setEndNode] = useState(() => {
    const cols = getCols();
    return { row: 9, col: Math.min(25, cols - 2) };
  });
  const [grid, setGrid] = useState(() => 
    generateGrid(getCols(), { row: 3, col: 3 }, { row: 9, col: Math.min(25, getCols() - 2) })
  );
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [algorithm, setAlgorithm] = useState("dijkstra"); // dijkstra or bfs
  const [movingNode, setMovingNode] = useState(null); // 'start' or 'end' or null

  // Ref to track anim timeouts so we can cancel on reset
  const timeoutsRef = useRef([]);
  const gridContainerRef = useRef(null);
  const isMounted = useRef(false);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const resetGrid = (cols = gridCols) => {
    clearTimeouts();
    setIsVisualizing(false);
    
    // Clear DOM animations manually
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < cols; c++) {
        const node = document.getElementById(`node-${r}-${c}`);
        if (node) {
          node.className = "node-base";
        }
      }
    }

    setGrid(generateGrid(cols, startNode, endNode));
  };

  // Re-calculate grid columns on resize
  useEffect(() => {
    const handleResize = () => {
      const cols = getCols();
      setGridCols(cols);
      
      // Keep end node within columns bound
      const adjustedCol = Math.min(25, cols - 2);
      setEndNode({ row: 9, col: adjustedCol });
      resetGrid(cols);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize grid on col changes
  useEffect(() => {
    if (isMounted.current) {
      resetGrid(gridCols);
    } else {
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridCols]);

  const clearPathfindingVisuals = () => {
    clearTimeouts();
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < gridCols; c++) {
        const node = document.getElementById(`node-${r}-${c}`);
        if (node) {
          const isStartNode = r === startNode.row && c === startNode.col;
          const isEndNode = r === endNode.row && c === endNode.col;
          const isWallNode = grid[r] && grid[r][c] && grid[r][c].isWall;
          
          if (isStartNode) {
            node.className = "node-base node-start";
          } else if (isEndNode) {
            node.className = "node-base node-end";
          } else if (isWallNode) {
            node.className = "node-base node-wall";
          } else {
            node.className = "node-base";
          }
        }
      }
    }
  };

  const handleMouseDown = (row, col) => {
    if (isVisualizing) return;
    
    // Clear any previous visual paths on new interaction
    clearPathfindingVisuals();

    if (row === startNode.row && col === startNode.col) {
      setMovingNode("start");
    } else if (row === endNode.row && col === endNode.col) {
      setMovingNode("end");
    } else {
      toggleWall(row, col);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isVisualizing) return;

    if (movingNode === "start") {
      // Prevent placing start on top of end or walls
      if (row === endNode.row && col === endNode.col) return;
      setStartNode({ row, col });
      updateNodePositions(row, col, "start");
    } else if (movingNode === "end") {
      if (row === startNode.row && col === startNode.col) return;
      setEndNode({ row, col });
      updateNodePositions(row, col, "end");
    } else {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setMovingNode(null);
  };

  const updateNodePositions = (row, col, type) => {
    setGrid((prevGrid) => {
      return prevGrid.map((r, rIdx) =>
        r.map((node, cIdx) => {
          const isNode = rIdx === row && cIdx === col;
          return {
            ...node,
            isStart: type === "start" ? isNode : node.isStart,
            isEnd: type === "end" ? isNode : node.isEnd,
            isWall: isNode ? false : node.isWall, // Clear walls if portal is dragged over them
          };
        })
      );
    });
  };

  const toggleWall = (row, col) => {
    if (row === startNode.row && col === startNode.col) return;
    if (row === endNode.row && col === endNode.col) return;

    const nodeEl = document.getElementById(`node-${row}-${col}`);
    const isWallNow = !grid[row][col].isWall;

    if (nodeEl) {
      nodeEl.className = isWallNow ? "node-base node-wall" : "node-base";
    }

    setGrid((prevGrid) => {
      const newGrid = prevGrid.slice();
      newGrid[row][col].isWall = isWallNow;
      return newGrid;
    });
  };

  // Run pathfinding pipeline
  const visualizePathfinding = () => {
    if (isVisualizing) return;
    
    // Wipe previous path styles
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < gridCols; c++) {
        const node = document.getElementById(`node-${r}-${c}`);
        if (node && !grid[r][c].isWall && !grid[r][c].isStart && !grid[r][c].isEnd) {
          node.className = "node-base";
        }
      }
    }

    setIsVisualizing(true);
    clearTimeouts();

    // Reconstruct clean grid references for algorithm
    const algorithmGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        distance: Infinity,
        isVisited: false,
        previousNode: null,
      }))
    );

    const start = algorithmGrid[startNode.row][startNode.col];
    const end = algorithmGrid[endNode.row][endNode.col];
    
    const visitedNodesInOrder =
      algorithm === "dijkstra"
        ? dijkstra(algorithmGrid, start, end)
        : bfs(algorithmGrid, start, end);

    const shortestPath = getNodesInShortestPathOrder(end);
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };

  // Animation sequences using CSS transitions
  const animateAlgorithm = (visitedNodes, shortestPath) => {
    const isMobile = window.innerWidth < 768;
    const speedMultiplier = isMobile ? 8 : 12;

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        const timeout = setTimeout(() => {
          animateShortestPath(shortestPath);
        }, speedMultiplier * i);
        timeoutsRef.current.push(timeout);
        return;
      }

      const node = visitedNodes[i];
      const timeout = setTimeout(() => {
        if (!node.isStart && !node.isEnd) {
          const el = document.getElementById(`node-${node.row}-${node.col}`);
          if (el) el.className = "node-base node-visited";
        }
      }, speedMultiplier * i);
      timeoutsRef.current.push(timeout);
    }
  };

  const animateShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      const node = shortestPath[i];
      const timeout = setTimeout(() => {
        const el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) {
          if (node.isStart) el.className = "node-base node-start node-shortest-path";
          else if (node.isEnd) el.className = "node-base node-end node-shortest-path";
          else el.className = "node-base node-shortest-path";
        }
        
        // At final node, unlock controls
        if (i === shortestPath.length - 1) {
          setIsVisualizing(false);
        }
      }, 35 * i);
      timeoutsRef.current.push(timeout);
    }
  };

  // Dijkstra core logic
  const dijkstra = (argGrid, start, end) => {
    const visitedNodes = [];
    start.distance = 0;
    const unvisitedNodes = getAllNodes(argGrid);

    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      // Stop if closest distance is infinity (unreachable)
      if (closestNode.distance === Infinity) return visitedNodes;
      if (closestNode.isWall) continue;

      closestNode.isVisited = true;
      visitedNodes.push(closestNode);

      if (closestNode === end) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, argGrid);
    }
    return visitedNodes;
  };

  const updateUnvisitedNeighbors = (node, argGrid) => {
    const neighbors = getNeighbors(node, argGrid);
    for (const neighbor of neighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  // Breadth First Search core logic
  const bfs = (argGrid, start, end) => {
    const queue = [start];
    const visitedNodes = [];
    start.isVisited = true;

    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodes.push(currentNode);

      if (currentNode === end) return visitedNodes;

      const neighbors = getNeighbors(currentNode, argGrid);
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previousNode = currentNode;
          queue.push(neighbor);
        }
      }
    }
    return visitedNodes;
  };

  const getNeighbors = (node, argGrid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(argGrid[row - 1][col]);
    if (row < argGrid.length - 1) neighbors.push(argGrid[row + 1][col]);
    if (col > 0) neighbors.push(argGrid[row][col - 1]);
    if (col < argGrid[0].length - 1) neighbors.push(argGrid[row][col + 1]);
    return neighbors.filter((n) => !n.isVisited);
  };

  const getAllNodes = (argGrid) => {
    const nodes = [];
    for (const row of argGrid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const sortNodesByDistance = (nodes) => {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const getNodesInShortestPathOrder = (endNodeObj) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNodeObj;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  return (
    <div className="flex flex-col space-y-6 select-none h-full justify-between pb-4">
      {/* Visualizer Control Console */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-lavender-medium/20 bg-white/20 backdrop-blur rounded-xl shadow-inner">
        {/* Algo Toggles */}
        <div className="flex items-center space-x-2">
          <label className="font-cyber text-[9px] tracking-widest text-deep-text/70 font-extrabold uppercase">Search Protocol:</label>
          <div className="flex rounded-md overflow-hidden border border-lavender-medium/35 bg-white/35">
            {[
              { id: "dijkstra", label: "Dijkstra" },
              { id: "bfs", label: "BFS (Standard)" },
            ].map((opt) => (
              <button
                key={opt.id}
                disabled={isVisualizing}
                onClick={() => setAlgorithm(opt.id)}
                className={`font-cyber text-[8px] sm:text-[9px] font-bold tracking-widest px-3 py-2 uppercase transition-all duration-300 ${
                  algorithm === opt.id
                    ? "bg-lavender-vibrant text-deep-text"
                    : "text-deep-text/75 hover:bg-lavender-light/35"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Command Triggers */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={visualizePathfinding}
            disabled={isVisualizing}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 font-cyber text-[9px] tracking-widest uppercase bg-gradient-to-r from-lavender-light to-lavender-vibrant text-deep-text px-4 py-3 rounded-lg border border-lavender-medium/30 hover:shadow-[0_0_12px_rgba(165,148,249,0.35)] transition-all disabled:opacity-50 font-bold"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Launch Navigation</span>
          </button>
          
          <button
            onClick={() => resetGrid(gridCols)}
            disabled={isVisualizing}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 font-cyber text-[9px] tracking-widest uppercase border border-lavender-medium/40 bg-white/30 text-deep-text px-4 py-3 rounded-lg hover:border-lavender-vibrant hover:text-lavender-vibrant transition-all disabled:opacity-50 font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Wipe Coords</span>
          </button>
        </div>
      </div>

      {/* Dynamic Simulation Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 py-1 text-[8px] sm:text-[9px] font-cyber tracking-widest uppercase text-deep-text/80 font-bold">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded bg-emerald-400 border border-emerald-500 shadow-[0_0_4px_#34d399] animate-pulse" />
          <span>Stargate Alpha (Start)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded bg-red-400 border border-red-500 shadow-[0_0_4px_#f87171] animate-pulse" />
          <span>Stargate Omega (Target)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 rounded border border-lavender-medium/30 bg-white/20 shadow-inner" />
          <span>Empty Sector (Click/Drag to Draw Asteroids)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded bg-indigo-950 border border-lavender-vibrant shadow-[0_0_4px_#A594F9]" />
          <span>Asteroid Blockade (Wall)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded bg-lavender-medium/45 border border-lavender-medium/20 shadow-[0_0_6px_#CDC1FF] animate-pulse" />
          <span>Scanned Sector</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-300 via-lavender-vibrant to-pink-300 shadow-[0_0_12px_#A594F9] animate-pulse" />
          <span>Optimal Route</span>
        </div>
      </div>

      {/* Grid Coordinates Panel */}
      <div className="relative w-full rounded-2xl overflow-hidden glass border-lavender-medium/25 bg-deep-text/5 flex items-center justify-center p-3 select-none">
        
        {/* Floating instruction overlay */}
        {!isVisualizing && (
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5 bg-lavender-bg/90 border border-lavender-medium/30 text-[7px] font-cyber tracking-widest text-deep-text/80 px-2 py-1 rounded shadow-sm">
            <HelpCircle className="w-3 h-3 text-lavender-vibrant animate-bounce" />
            <span>DRAG PORTALS TO REDIRECT STARSHIPS</span>
          </div>
        )}

        <div
          ref={gridContainerRef}
          onMouseLeave={handleMouseUp}
          className="grid gap-[2px] w-full"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            touchAction: "none",
          }}
        >
          {grid.map((row, rIdx) =>
            row.map((node, cIdx) => {
              const { isStart, isEnd, isWall } = node;
              let customClass = "node-base";
              if (isStart) customClass = "node-base node-start";
              else if (isEnd) customClass = "node-base node-end";
              else if (isWall) customClass = "node-base node-wall";

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  id={`node-${rIdx}-${cIdx}`}
                  className={customClass}
                  onMouseDown={() => handleMouseDown(rIdx, cIdx)}
                  onMouseEnter={() => handleMouseEnter(rIdx, cIdx)}
                  onMouseUp={handleMouseUp}
                  onTouchStart={(e) => {
                    // Prevent page scrolling during grid dragging
                    e.preventDefault();
                    handleMouseDown(rIdx, cIdx);
                  }}
                  onTouchMove={(e) => {
                    // Mobile touch coordinates translation to element mapping
                    if (!mouseIsPressed && !movingNode) return;
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element && element.id && element.id.startsWith("node-")) {
                      const [, r, c] = element.id.split("-");
                      handleMouseEnter(parseInt(r), parseInt(c));
                    }
                  }}
                  onTouchEnd={handleMouseUp}
                  style={{
                    aspectRatio: "1/1",
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
