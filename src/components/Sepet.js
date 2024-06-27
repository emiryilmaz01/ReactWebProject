import React from "react";
import { Button, List } from "antd";
import { useNavigate } from "react-router-dom";
import "./Sepet.css";

const Sepet = ({ cartItems, removeFromCart, returnToShopping, totalPrice }) => {
  const navigate = useNavigate();

  const handleReturnToShopping = () => {
    returnToShopping(); // Alışverişe devam et fonksiyonunu çağır
  };

  const handlePurchase = () => {
    // Satın alma ekranına yönlendir
    navigate("/satınal");
  };

  return (
    <div className="Sepet">
      <div>
        <h2 style={{ marginBottom: 16 }}>Sepetinizdeki Ürünler</h2>
        <List
          bordered
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.image && (
                    <div style={{ marginRight: 16 }}>
                      <img
                        src={item.image} // URL.createObjectURL kullanmadan doğrudan URL'yi kullanın
                        alt="Eşya Fotoğrafı"
                        style={{
                          maxWidth: 100,
                          maxHeight: 100,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <div>{`${item.name} - ${item.day} - ${item.time} - ${item.price} TL`}</div>
                </div>
                <Button type="danger" onClick={() => removeFromCart(item)}>
                  Sepetten Çıkar
                </Button>
              </div>
            </List.Item>
          )}
          style={{ marginBottom: 16, maxWidth: 600, width: "100%" }}
        />
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <h3>Toplam Fiyat: {totalPrice} TL</h3>
            <Button
              type="primary"
              onClick={handlePurchase}
              style={{ marginRight: 16, marginBottom: 16, width: 150 }}
            >
              Satın Al
            </Button>
            <Button
              type="primary"
              onClick={handleReturnToShopping}
              style={{ width: 150 }}
            >
              Alışverişe Devam Et
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sepet;
