import React, { useState } from "react";
import {
  Button,
  List,
  Input,
  Modal,
  Form,
  DatePicker,
  TimePicker,
  InputNumber,
  Upload,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./Eşyalarım.css";

import moment from "moment";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

const Eşyalarım = ({ setItemsExternal }) => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  const [currentDates, setCurrentDates] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (
      currentItem &&
      currentDates.length === 2 &&
      currentTime &&
      currentPrice !== null &&
      fileList.length > 0
    ) {
      const newItem = {
        name: currentItem,
        startDate: currentDates[0].format("YYYY-MM-DD"),
        endDate: currentDates[1].format("YYYY-MM-DD"),
        time: currentTime.format("HH:mm"),
        price: currentPrice,
        image: fileList[0].originFileObj,
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setItemsExternal(newItems);
      setIsModalOpen(false);
      setCurrentItem("");
      setCurrentDates([]);
      setCurrentTime(null);
      setCurrentPrice(null);
      setFileList([]);
    } else {
      alert("Lütfen tüm alanları doldurun!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const handleDelete = (item) => {
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
    setItemsExternal(newItems);
  };

  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Sadece resim dosyaları yüklenebilir!");
      }
      return isImage ? false : Upload.LIST_IGNORE;
    },
    fileList,
    onChange: handleChange,
    multiple: false,
  };

  return (
    <div className="esyalarim" style={{ position: "relative", padding: 24 }}>
      <div style={{ position: "absolute", bottom: 24, right: 24 }}>
        <div className="aralik">
          <Tooltip title="Listeye Ekle">
            <Button
              type="primary"
              shape="circle"
              onClick={showModal}
              style={{ marginBottom: 16 }}
            >
              <PlusOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Tümünü Sil">
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                setItems([]);
                setItemsExternal([]);
              }}
              style={{ marginBottom: 16 }}
            >
              <MinusOutlined />
            </Button>
          </Tooltip>

          <Tooltip title="Listele">
            <Button
              type="primary"
              shape="circle"
              onClick={toggleList}
              style={{ marginBottom: 16 }}
            >
              <UnorderedListOutlined />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div style={{ width: 600, margin: "0 auto", marginTop: 24,  }}>
        {isListVisible && (
          <List
            bordered
            dataSource={items}
            locale={{ emptyText: "Listede eşya yok" }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleDelete(item)}>
                    Sil
                  </Button>,
                ]}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.image && (
                    <div style={{ marginRight: 16 }}>
                      <img
                        src={URL.createObjectURL(item.image)}
                        alt="Eşya Fotoğrafı"
                        style={{
                          maxWidth: 100,
                          maxHeight: 100,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <div style={{color:'white'}}>{`${item.name} - ${item.startDate} - ${item.endDate} - ${item.time} - ${item.price} TL`}</div>
                </div>
              </List.Item>
            )}
          />
        )}

        <Modal
          title="Eşya Ekle"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Eşya Adı">
              <Input
                value={currentItem}
                onChange={(e) => setCurrentItem(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Başlangıç ve Bitiş Tarihleri">
              <RangePicker
                value={currentDates}
                onChange={(dates) => setCurrentDates(dates)}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="Saat">
              <TimePicker
                onChange={(time) => setCurrentTime(time)}
                format="HH:mm"
              />
            </Form.Item>
            <Form.Item label="Para">
              <InputNumber
                value={currentPrice}
                onChange={(value) => setCurrentPrice(value)}
              />
            </Form.Item>
            <Form.Item label="Fotoğraf Ekle">
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <PlusOutlined />
                </p>
                <p className="ant-upload-text">
                  Fotoğrafı buraya sürükleyin veya tıklayın
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Eşyalarım;
