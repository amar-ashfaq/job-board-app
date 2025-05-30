import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("jobs").select("*");
      console.log("Test data:", data);
      console.log("Test error:", error);
    };

    testConnection();
  }, []);

  return <h1>Testing Supabase Connection</h1>;
}

export default App;
