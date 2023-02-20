import { useParams, Link } from 'react-router-dom'

const NotFound = () => {
  const { id } = useParams();

  return (
    <section className="dogs element-padding-hor">
      <h2>We don't have {id} dogs</h2>
      <Link to='/'>
        <button className="dogs__back-to-home">back to search</button>
      </Link>
      <img 
        className="not-found__dog-img"
        src='img/not-found.jpg'
        alt={`yawning dog`}
      />
    </section>
  )
}

export default NotFound;
