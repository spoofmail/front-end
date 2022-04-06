import Address from './Address';

import { useAppSelector } from '../../../hooks/useRedux';

export const AddressList = props => {
    const addressIds = useAppSelector(({ address }) => address.ids)
    const reverse = Array.from(addressIds).reverse();
    return (
        <div className="body">
            { 
                reverse.length === 0 ? 
                <h1 style = {{ backgroundColor: "var(--primary-color)", padding: 15, boxShadow: "0 0 4px black" }}>Click "Generate Email" to create an inbox</h1> : 
                reverse.map((e, i) => <Address key = {e} id = {e} />)
            }
        </div>
    );
}