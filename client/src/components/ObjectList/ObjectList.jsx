import './objectList.scss';

const ObjectList = (props) => {
  const { template, data } = props;
  return (
    <table className="objectlist-section">
      <thead>
        <tr>
          {template?.map((column, index) => (
            <th key={index}>{column.label}</th>
          ))}
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) =>  (
          <tr key={index}>
            {template?.map((column, index) => (
              <td key={index}>{row[column.type]}</td>
            ))}
            <td>
              <button>1</button>
              <button>2</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ObjectList;
