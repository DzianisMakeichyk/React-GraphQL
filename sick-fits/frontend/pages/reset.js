import Reset from '../components/Reset'

const ResetPage = props => (
    <div>
        {props.query.resetToken}
        <Reset resetToken={props.query.resetToken} />
    </div>
);

export default ResetPage;
