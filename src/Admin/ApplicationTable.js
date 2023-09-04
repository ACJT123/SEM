import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { createClient, SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useState, useEffect } from "react";


const supabase = createClient(
  "https://wxiywbcwpvxhrcspydrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aXl3YmN3cHZ4aHJjc3B5ZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NTA2NDksImV4cCI6MjAwOTMyNjY0OX0.gBF6C_LxOkJL2R0EaBiG5eZoIPgbjb-MPNbecP7XFWA"
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Level of Study",
    dataIndex: "level_of_study",
    key: "level_of_study",
  },
  {
    title: "Certificate",
    dataIndex: "certificate",
    key: "certificate",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* approve and reject button */}
        <Button
          type="primary" 
          style={
            {
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
            }
          }
          >
          Approve
        </Button>
        <Button type="primary" danger>
          Reject
        </Button>
      </Space>
    ),
  },
];


function ApplicationTable() {
  const [data, setData] = useState([]); // Initialize data as an empty array

  
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from("application").select();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
  
    fetchData(); // Call the async function
  }, []); // Empty dependency array ensures this runs once
  

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  );

}

export default ApplicationTable;
