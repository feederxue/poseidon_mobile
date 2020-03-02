import React from 'react';
import { SearchBar,} from 'antd-mobile';
import './search.css'

class Search extends React.Component {
    state = {
        value: '',
    };
    onChange = (value) => {
        this.setState({ value });
    };
    render() {
        return (
            <div>
                <SearchBar
                    value={this.state.value}
                    placeholder="Search"
                    showCancelButton={false}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

export default Search;
