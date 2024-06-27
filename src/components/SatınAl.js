import React, { useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import "./SatınAl.css";

const SatınAl = ({ totalPrice }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isMailModalVisible, setIsMailModalVisible] = useState(false);

  const handleBackToShopping = () => {
    navigate("/alışveriş");
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    setIsMailModalVisible(true); // Form geçerli olduğunda...
  };

  const handlePurchase = () => {
    message.success("Satın alma işlemi başarılı!");
    setIsMailModalVisible(false);
    navigate("/alışveriş");
  };

  const confirmMailSend = () => {
    message.success("Mail başarı ile gönderildi!");
    handlePurchase();
  };

  const cancelMailSend = () => {
    setIsMailModalVisible(false);
  };

  return (
    <div className="satinal">
      <div>
        <h2>Satın Alma İşlemi</h2>
        <h3>Toplam Fiyat: {totalPrice} TL</h3>
        <div style={{display:'flex'}}>
          <Form
            form={form}
            name="purchase"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 600, width: "100%", marginTop: 16 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Kart Numarası"
              name="cardNumber"
              rules={[
                { required: true, message: "Lütfen kart numaranızı girin!" },
              ]}
            >
              <Input type='number'maxLength={12}/>
            </Form.Item>
            <Form.Item
              label="Son Kullanma"
              name="expiryDate"
              rules={[
                {
                  required: true,
                  message: "Lütfen son kullanma tarihini girin!",
                },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item
              label="CVV"
              name="cvv"
              rules={[
                { required: true, message: "Lütfen CVV numaranızı girin!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" style={{ width: 200 }}>
                Satın Al
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Button
          type="primary"
          onClick={handleBackToShopping}
          style={{ width: 200, marginTop: 16 }}
        >
          Alışverişe Devam Et
        </Button>

        <Modal
          title="Dekont Mail Gönderilsin mi?"
          visible={isMailModalVisible}
          onOk={confirmMailSend}
          onCancel={cancelMailSend}
          okText="Evet"
          cancelText="Hayır"
        >
          <p>
            Satın alma işleminizin dekontunu mail olarak göndermek ister
            misiniz?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default SatınAl;
