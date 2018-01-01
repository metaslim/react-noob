import React from 'react';

const Button = ({onClick, className='', children}) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

const Loading = () =>
  <div>Loading...</div>

const withLoading = (Component) => ({ isLoading, ...rest}) =>
  isLoading
  ? <Loading />
  : <Component { ...rest} />


/*function withLoading(Component) {
  return function(props) {
    const { isLoading, ...rest} = props;

    return isLoading
    ?  <Loading />
    :  <Component { ...rest} />
  }
}
*/

const ButtonWithLoading = withLoading(Button)

export {Button, ButtonWithLoading};
  //class Button extends Component {
  //  render() {
  //    const {onClick, className='', children} = this.props;

  //    return (
  //      <button onClick={onClick} className={className} type="button">
  //        {children}
  //      </button>
  //    );
  //  }
  //}
