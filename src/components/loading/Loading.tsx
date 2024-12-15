import { Spinner } from 'react-bootstrap'
interface LoadingProps {
    loading:boolean;
}
const Loading: React.FC<LoadingProps> = ({
    loading
}) => {
  return (
    <Spinner className={loading? "mx-auto" : "collapse"} animation='border' variant='danger' role='status'>
              <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loading