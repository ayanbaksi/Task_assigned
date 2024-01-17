// Table.js
import axios from 'axios';
import styled from './Table.module.scss';
import { useState, useEffect } from 'react';
import ViewModal from '../ViewModal/ViewModal';

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const openModal = (data) => {
    setSelectedData(data);
  };

  const closeModal = () => {
    setSelectedData(null);
  };

  const toggleAlarm = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].alarm = !updatedTableData[index].alarm;
    setTableData(updatedTableData);
  };

  const getTableData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tabledata/list');
      const res = response.data;
      setTableData(res.result);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  console.log('tableData', tableData);

  return (
    <div className={styled.table_container}>
      <table className={styled.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Location (Latitude and Longitude)</th>
            <th>Alarm</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((elem, index) => (
            <tr key={index}>
              <td>{elem.time}</td>
              <td>{`${elem.location.latitude}, ${elem.location.longitude}`}</td>
              <td>
                <button
                  onClick={() => toggleAlarm(index)}
                  style={{
                    width: '5rem',
                    height: '2rem',
                    borderRadius: '8px',
                    backgroundColor: elem.alarm ? 'green' : 'red',
                  }}
                ></button>
              </td>
              <td>
                <button className={styled.view_button} onClick={() => openModal(elem)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedData && <ViewModal data={selectedData} onClose={closeModal} />}
    </div>
  );
};

export default Table;
