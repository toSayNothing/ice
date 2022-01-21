// import Guide from '@/components/Guide';

const Home = () => {
  const onFetchUser = async () => {
    console.log('onFetchUser');
    const res = await fetch('/api/new');
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <h1>hi, Ice!</h1>
      <button type="button" onClick={onFetchUser}>click to fetch data</button>
    </div>
  );
};

export default Home;
