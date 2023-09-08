import React from "react";
import { Button, Space, Table, Skeleton, Tag, Modal, message } from "antd";
import { createClient, SupabaseRealtimePayload } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  "https://wxiywbcwpvxhrcspydrx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aXl3YmN3cHZ4aHJjc3B5ZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM3NTA2NDksImV4cCI6MjAwOTMyNjY0OX0.gBF6C_LxOkJL2R0EaBiG5eZoIPgbjb-MPNbecP7XFWA"
);

function ApplicationTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const showConfirm = (record, action, actionText) => {
    Modal.confirm({
      title: `Do you want to ${action} this application?`,
      content: "This action cannot be undone.",
      okText: actionText,
      cancelText: "Cancel",
      onOk() {
        console.log(`${actionText} button clicked`);
        if (action === "approve") {
          handleApprove(record);
        } else if (action === "reject") {
          handleReject(record);
        }
        else if (action === "delete") {
          handleDelete(record);
        }
      },
      onCancel() {
        console.log("Cancel button clicked");
      },
    });
  };

  const handleApprove = async (record) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update({ status: "Approved" })
        .eq("id", record.id);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully:", data);
        success("Application approved successfully");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleReject = async (record) => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update({ status: "Rejected" })
        .eq("id", record.id);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        console.log("Data updated successfully:", data);
        success("Application rejected successfully");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleDelete = async (record) => {
    try {
      await supabase.storage.from("Certificates").remove([`${record.name}.pdf`]);
      const { data, error } = await supabase
        .from("application")
        .delete()
        .eq("id", record.id);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {

        console.log("Data updated successfully:", data);
        success("Application deleted successfully");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const columns = [
    {
      title: "Application ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Level of Study",
      dataIndex: "level_of_study",
      key: "level_of_study",
      filters: [
        {
          text: "TARUMT Relavant Diploma",
          value: "TARUMT Relavant Diploma",
        },
        {
          text: "TARUMT Foundation In Computing Track A",
          value: "TARUMT Foundation In Computing Track A",
        },
        {
          text: "STPM",
          value: "STPM",
        },
        {
          text: "A-Level",
          value: "A-Level",
        },
        {
          text: "UEC",
          value: "UEC",
        },
        {
          text: "IHL Diploma",
          value: "IHL Diploma",
        },
        {
          text: "IHL Foundation",
          value: "IHL Foundation",
        },
      ],
      onFilter: (value, record) => record.level_of_study.indexOf(value) === 0
    },
    {
      title: "Certificate",
      dataIndex: "certificate",
      key: "certificate",
      render: (certificateUrl) => (
        <a
          href={certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=" text-blue-500 hover:text-blue-800 hover:underline"
        >
          View Certificate
        </a>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => (
        <>
          {status === "Pending" && (
            <Tag color="orange" key={status}>
              {status}
            </Tag>
          )}
          {status === "Approved" && (
            <Tag color="green" key={status}>
              {status}
            </Tag>
          )}
          {status === "Rejected" && (
            <Tag color="red" key={status}>
              {status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.status !== "Pending" ? (
            <Button
              type="primary"
              style={{
                backgroundColor: "orange",
                borderColor: "orange",
              }}
              onClick={() => showConfirm(record, "delete", "Delete")}
            >
              Delete
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#52c41a",
                  borderColor: "#52c41a",
                }}
                onClick={() => showConfirm(record, "approve", "Approve")}
              >
                Approve
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => showConfirm(record, "reject", "Reject")}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from("application").select();
        console.log(data);
        setData(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }

    fetchData();
    supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "application",
        },
        (payload) => {
          fetchData();
        }
      )
      .subscribe();
  }, []);

  return (
    // Use Skeleton when loading
    <Skeleton loading={loading} active>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </Skeleton>
  );
}

export default ApplicationTable;
