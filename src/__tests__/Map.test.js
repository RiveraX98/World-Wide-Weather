import { render} from '@testing-library/react';
import { Map } from '../Map';

it ('should be zoomed out at start', () =>{
    const {getByText} = render(<Map/>)
    const zoom = getByText("Zoom: 1.00")
    expect(zoom).toBeInTheDocument()
})