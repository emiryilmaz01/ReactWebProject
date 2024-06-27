import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Profil.css";

const Profil = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username")); // Kullanıcı adını state'e al
  const [isEditing, setIsEditing] = useState(false); // Düzenleme durumu

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("email");
    navigate("/signin"); // Signin sayfasına yönlendir
  };

  const onFinish = (values) => {
    localStorage.setItem("username", values.username); // Yeni kullanıcı adını yerel depolamaya kaydet
    setUsername(values.username); // State'i güncelle
    setIsEditing(false); // Düzenleme modunu kapat
  };

  return (
    <div className="Profil" style={{ margin: "0 auto", textAlign: "center" }}>
      <div>
        <Typography.Title level={1}>Profil</Typography.Title>

        {isEditing ? (
          <Form
            name="editProfile"
            initialValues={{ username }}
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: "0 auto" }}
          >
            <Form.Item
              name="username"
              label="Kullanıcı Adı"
              rules={[
                { required: true, message: "Lütfen kullanıcı adınızı girin!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Kaydet
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                style={{ marginLeft: 8 }}
              >
                İptal
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Typography.Text>Username: {username}</Typography.Text>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              style={{ marginLeft: 8 }}
            >
              Düzenle
            </Button>
          </div>
        )}

        <Typography.Text>
          Email: {localStorage.getItem("email")}
        </Typography.Text>
        <div style={{ marginTop: 16 }}>
          <Button type="primary" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
