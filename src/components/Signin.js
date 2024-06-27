import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(
    localStorage.getItem("username") !== null
  );

  const onFinish = (values) => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (!storedUsername || !storedPassword) {
      message.error("Kayıtlı kullanıcı bulunamadı. Lütfen kayıt olunuz.");
      return;
    }

    if (
      values.username === storedUsername &&
      values.password === storedPassword
    ) {
      message.success("Giriş başarılı!");
      navigate("/Home"); // Giriş başarılıysa profil sayfasına yönlendir
    } else {
      message.error("Kullanıcı adı veya şifre yanlış!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="signin">
      <div className="ortala">
        {!hasAccount && (
          <p style={{ color: "red", textAlign: "center" }}>Kayıt olunuz</p>
        )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "0 auto" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[
              { required: true, message: "Lütfen kullanıcı adınızı girin!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Beni hatırla</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                Giriş Yap
              </Button>
              <Button
                type="default"
                htmlType="button"
                onClick={() => navigate("/register")}
              >
                Kayıt Ol
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
