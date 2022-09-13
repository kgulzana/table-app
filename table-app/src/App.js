import "antd/dist/antd.min.css";
import { Table, Button, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "Asel Jorgoeva",
      email: "asel@gmail.com",
      adress: "Bokonbaeva 2",
    },
    {
      id: 2,
      name: "Ivan Ivanov",
      email: "ivan@gmail.com",
      adress: "Isanova 25",
    },
    {
      id: 3,
      name: "Sergey Sergeevich",
      email: "sergey@gmail.com",
      adress: "Tynystanova 21",
    },
    {
      id: 4,
      name: "Olga Orlova",
      email: "olga@gmail.com",
      adress: "Tynystanova 33",
    },
    {
      id: 5,
      name: "Maksim Fadeev",
      email: "maksim@gmail.com",
      adress: "Kulatova 45",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },

    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Adress",
      dataIndex: "adress",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      adress: "Adress " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="app-header">
        <Button
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={onAddStudent}
        >
          Add a new student
        </Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit student"
          open={isEditing}
          okText="Save"
          onCancel={() => resetEditing()}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.adress}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, adress: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
