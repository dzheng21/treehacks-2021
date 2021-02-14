import React from 'react'
import fetch from 'isomorphic-unfetch'
import Select, { components } from 'react-select'
import { get } from 'http';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import axios from 'axios';

import { GOOGLE_API_KEY, CALENDAR_ID } from '../secret/google-calendar-assets.json';

export default class extends React.Component {
    static async getInitialProps({ req }) {
        const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}`)
        console.log("asdadsf" + response.data.items + " __ " + response.data.items[0] + " ****" + response.data.kind);
        const events = response.data.items;
        let eventList = events.map(e => ({ label: e.summary, value: e.description }));
        return { eventList: eventList }
    }

    constructor(props) {
        super(props);
        this.state = { data: {}, images: {}, value: [] };
    }
    onChange(value) {
        this.setState({ value: value });
    }

    render() {
        const MultiValueLabel = (props) => {
            let url = props.data.value;
            let imgUrl = this.state.images[url];
            if (!imgUrl) {
                let get = async () => {
                    let data = await fetch(url);
                    data = await data.json();
                    imgUrl = data.sprites.back_default;
                    this.setState({
                        images: {
                            ...this.state.images,
                            [url]: imgUrl
                        }
                    });
                }
                get();
            }
            return (
                <div>
                    <components.MultiValueLabel {...props} />
                    <img src={imgUrl} />
                </div>
            );
        };
        return (
            <div>
                <Link href='/'><Button color="primary"><a>Back</a></Button></Link>
                <Select
                    closeMenuOnSelect={false}
                    defaultValue={[]}
                    isMulti
                    value={this.state.value}
                    onChange={e => this.onChange(e)}
                    components={{ MultiValueLabel }}
                    //     styles={{ multiValueLabel: (base) => ({ ...base, backgroundColor: colourOptions[2].color, color: 'white' }) }}
                    options={this.props.pokemonList}
                />
                Hello World

        {/* <table>{this.props.pokemonList.map(pokemon =>
                    <tr key={pokemon.name}>
                        <td>{pokemon.name}</td>
                        <td><img src={pokemon.sprites.front_default} /></td>
                    </tr>)}
                </table> */}
            </div>
        )
    }
}