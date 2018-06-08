import React, {Component} from 'react';
import API from '../../utils/AppUtil';

class PromoCode extends Component {
    render() {
        const data={
            'disPrice': '12',
            'subExp_id': '5b113df77860fb4e57aa8cef',
            'promocode': 'TESTADMIN'
        };

        API.AddpromoCode(data)
            .then((resp) => {
                console.log('promo' + resp)
            })
            .catch((err) => {
                console.log('error promo' + err)
            });

        return (
            <div className="animated fadeIn">
                Welcome to PromoCode page.
            </div>
        )
    }
}


export default PromoCode;
