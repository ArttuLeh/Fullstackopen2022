const Notification = ({ error }: { error: string | null }) => {
  const style = {
    color: 'red',
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!error) {
    return null;
  }
  return <div style={style}>{error}</div>;
};
export default Notification;
