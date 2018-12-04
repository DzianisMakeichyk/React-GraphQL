import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';

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
                                {possiblePermissions.map(permissin => <th key={permissin}>{permissin}</th>)}
                                <th>Updates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map(user => <UserPermissions key={user.id} user={user} />)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )}
    </Query>
);

class UserPermissions extends React.Component {
    static PropTypes = {
      user: PropTypes.shape({
         name: PropTypes.string,
         email: PropTypes.string,
         id: PropTypes.string,
         permissions: PropTypes.array,
      }).isRequired,
    };

    state = {
        permissions: this.props.user.permissions,
    };

    handlePermissionChange = (e) => {
        const checkbox = e.target;
        let updatedPermissions = [...this.state.permissions];

        if (checkbox.checked()) {
            updatedPermissions.push(checkbox.value)
        } else {
            updatedPermissions = updatedPermissions.filter(permissions => permissions !== checkbox.value)
        }

        this.setState({ permissions: updatedPermissions })
    };

    render() {
        const { user } = this.props;
        const { permissions } = this.state;
        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                    <td>
                        <label key={permission} htmlFor={`${user.id}-permission-${permission}`}>
                            <input
                                type="checkbox"
                                checked={permissions.includes(permission)}
                                value={permission}
                                onChange={this.handlePermissionChange}
                            />
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