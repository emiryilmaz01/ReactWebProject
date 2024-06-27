import React, { useState, useEffect } from "react";
import { Button, List, Input, DatePicker } from "antd";
import moment from "moment";
import "./Alışveriş.css";
import arabaBebek from "../assets/arababebek.jpeg";
import birkinbag from "../assets/birkinbag.jpg";
import merdiven from "../assets/merdiven.jpeg";

const { RangePicker } = DatePicker;

const Alışveriş = ({ items, addToCart }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDateRange, setFilterDateRange] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  // Default items list
  const defaultItems = [
    { id: 1, image: arabaBebek, name: "bebek arabası", startDate: "2024-06-01", endDate: "2024-06-10", time: "10:00", price: 50 },
    { id: 2, image: birkinbag, name: "hermes çanta", startDate: "2024-06-05", endDate: "2024-06-15", time: "14:00", price: 70 },
    { id: 3, image: merdiven, name: "merdiven", startDate: "2024-06-07", endDate: "2024-06-15", time: "14:00", price: 80 },
    // Add more default items as needed
  ];

  useEffect(() => {
    let combinedItems = [...defaultItems, ...items];

    if (filterName) {
      combinedItems = combinedItems.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterDateRange.length === 2) {
      const [startDate, endDate] = filterDateRange.map(date => moment(date));

      combinedItems = combinedItems.filter((item) => {
        const itemStartDate = moment(item.startDate, "YYYY-MM-DD");
        const itemEndDate = moment(item.endDate, "YYYY-MM-DD");

        return (
          startDate.isSameOrBefore(itemEndDate, 'day') &&
          endDate.isSameOrAfter(itemStartDate, 'day')
        );
      });
    }

    setFilteredItems(combinedItems);
  }, [filterName, filterDateRange, items]);

  const handleAddToCart = (item) => {
    if (!addedItems.includes(item)) {
      addToCart(item);
      setAddedItems([...addedItems, item]);
    }
  };

  return (
    <div className="alisveris">
      <div className="ortala">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Input
            placeholder="Eşya adına göre filtrele"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <RangePicker
            placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
            onChange={(dates) => setFilterDateRange(dates || [])}
            style={{ marginBottom: 16, width: "100%" }}
          />
        </div>

        <List
          bordered
          dataSource={filteredItems}
          locale={{ emptyText: "Listede eşya yok" }}
          renderItem={(item) => (
            <List.Item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.image && (
                  <div style={{ marginRight: 16 }}>
                    <img
                      src={item.image}
                      alt="Eşya Fotoğrafı"
                      style={{
                        maxWidth: 100,
                        maxHeight: 100,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div>{`${item.name} - ${item.startDate} - ${item.endDate} - ${item.time} - ${item.price} TL`}</div>
              </div>
              <Button
                type="primary"
                onClick={() => handleAddToCart(item)}
                disabled={addedItems.includes(item)}
              >
                Sepete Ekle
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Alışveriş;
