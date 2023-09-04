import React, { useState, useEffect } from "react";
import {
  FileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ApplicationTable from "./ApplicationTable";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Applications", "1", <FileOutlined />),
  getItem("Questions", "2", <QuestionCircleOutlined />),
];

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // Default to "Applications"
  const {
    token: { colorBgContainer },
  } = theme.useToken();




  const handleMenuSelect = (e) => {
    setSelectedMenuItem(e.key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onSelect={handleMenuSelect}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <h1
            className="
                text-2xl 
                text-align-left
                text-black
                p-4
            "
          >
            {selectedMenuItem === "1" ? "Applications From Students" : "Questions"}
          </h1>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {selectedMenuItem === "1" ? <ApplicationTable /> : <h1>Questions</h1>}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
