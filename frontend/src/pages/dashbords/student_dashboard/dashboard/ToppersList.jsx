import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const ToppersList = () => {
  const toppers = [
    { id: 1, name: 'Chihoo Hwang', rank: 1, percentage: '99.9%', avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Ajay Suryanavash', rank: 2, percentage: '98%', avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Johnson', rank: 3, percentage: '97%', avatar: '/avatars/3.jpg' },
    { id: 4, name: 'John Doe', rank: 5, percentage: '95%', avatar: '/avatars/4.jpg' },
  ];

  return (
    <div className="toppers-list">
      <div className="card-header">
        <h3>Universities Toppers</h3>
        <button className="btn-icon"><FaEllipsisV /></button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rank</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {toppers.map(topper => (
              <tr key={topper.id}>
                <td>
                  <div className="user-info">
                    <img src={topper.avatar} alt={topper.name} className="avatar" />
                    <span>{topper.name}</span>
                  </div>
                </td>
                <td>{topper.rank}</td>
                <td>{topper.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToppersList;