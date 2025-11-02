import axios from "axios";
import React, { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

const UserGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // Fetch graph from backend
  const fetchGraph = async () => {
    try {
      const response = await axios.get("https://cybernauts-development-assignment-nfhn.onrender.com/graph");
      const users = response.data.users;

      // Create nodes
      const newNodes = users.map((user, index) => ({
        id: user._id,
        data: { label: `${user.name} (${user.age})` },
        position: { x: 150 * index, y: 100 },
        style: {
          background: "#3b82f6",
          color: "#fff",
          borderRadius: "50%",
          padding: 10,
          width: 120,
          textAlign: "center",
          fontWeight: 500,
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        },
      }));

      // Create edges based on friends
      const newEdges = [];
      users.forEach((user) => {
        user.friends.forEach((friendId) => {
          if (user._id < friendId) {
            newEdges.push({
              id: `e-${user._id}-${friendId}`,
              source: user._id,
              target: friendId,
            });
          }
        });
      });

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error("Failed to fetch graph:", error.response?.data || error.message);
    }
  };

  // Fetch graph on mount and every 5 seconds for near-real-time updates
  useEffect(() => {
    fetchGraph();
    const interval = setInterval(fetchGraph, 5000); // fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle connecting nodes and call backend API
  const onConnect = async (params) => {
    // Optimistically add edge visually
    setEdges((eds) => addEdge(params, eds));

    try {
      await axios.post("https://cybernauts-development-assignment-nfhn.onrender.com/relationship", {
        userId: params.source,
        friendId: params.target,
      });

      console.log("Relationship created:", params.source, params.target);
      // Refetch graph to ensure consistency
      fetchGraph();
    } catch (error) {
      console.error("Error creating relationship:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default UserGraph;
