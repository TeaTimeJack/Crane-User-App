import Clock from './components/Clock'
// import Weather from './components/Weather'
import Tips from './components/Tips'

const Home = () => {
  return (
    <div className="row">
      <h2>Welcome To The Crane Users App</h2>
      <div className ="row">
        <div className="col s12 m4 l4"></div>
        <div className="col s12 m4 l4"><Clock /></div>
        <div className="col s12 m4 l4"></div>
      </div>
      
      <Tips />
    </div>
  )
}

export default Home
