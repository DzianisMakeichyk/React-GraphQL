import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table'
import SickButton from './styles/SickButton'

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => (
            <div>
                <Error error={error} />
                <div>
                    <h2>Manage Permissions</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {possiblePermissions.map(permissin => <th>{permissin}</th>)}
                                <th>Updates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => <User user={user} />)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )}
    </Query>
);

class User extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permissin => (
                    <td>
                        <label htmlFor={`${user.id}-permission-${permissin}`}>
                            <input type="checkbox" />
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton>
                        Update
                    </SickButton>
                </td>
            </tr>
        )
    }
}

export default Permissions;
