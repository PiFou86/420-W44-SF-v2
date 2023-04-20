import React, { Component } from 'react';
//import authService from './api-authorization/AuthorizeService'

export class FetchClients extends Component {
    static displayName = FetchClients.name;

    constructor(props) {
        super(props);
        this.state = { clients: [], loading: true };
        this.genererClients = this.genererClients.bind(this);
    }

    componentDidMount() {
        this.populateClientsData();
    }

    static renderClientsTable(clients) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client =>
                        <tr key={client.clientId}>
                            <td>{client.prenom}</td>
                            <td>{client.nom}</td>
                            <td>{client.clientId}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchClients.renderClientsTable(this.state.clients);

        return (
            <div>
                <h1 id="tabelLabel" >Liste des clients</h1>
                <p>Ce composant permet de voir que votre base de données est bien connectées.</p>
                <p>
                    <button onClick={this.genererClients}>
                        Générer de nouveaux clients (1 à 5 clients)
                    </button>
                </p>
                {contents}
            </div>
        );
    }

    async genererClients() {
        //const token = await authService.getAccessToken();
        //await fetch('clients/generer', {
        //    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        //});
        await fetch('clients/generer');

        await this.populateClientsData();
    }

    async populateClientsData() {
        //const token = await authService.getAccessToken();
        //const response = await fetch('clients', {
        //    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        //});
        const response = await fetch('clients');
        const data = await response.json();
        this.setState({ clients: data, loading: false });
    }
}
