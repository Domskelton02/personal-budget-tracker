import { UserInformation } from "./types";
import { allCities } from './utils/all-cities';

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow = ({ label, value }: InfoRowProps) => (
  <div>
    <span style={{ marginRight: 5 }}>
      <b>{label}:</b>
    </span>
    <span>{value}</span>
  </div>
);

interface ProfileInformationProps {
  userData: UserInformation | null;
}

export const ProfileInformation = ({ userData }: ProfileInformationProps) => {
  if (!userData) {
    return (
      <>
        <u>
          <h3>Your Submitted User Information</h3>
        </u>
        <div className="user-info">
          <div>No information provided</div>
        </div>
      </>
    );
  }

  const { email, firstName, lastName, phone, city, state, username, zipCode } = userData; // Destructure username and zipCode from userData
  const formattedPhone = `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  const cityValue = allCities.includes(city) ? city : 'Invalid city';

  return (
    <>
      <u>
        <h3>Your Submitted User Information</h3>
      </u>
      <div className="user-info">
        <InfoRow label="Email" value={email} />
        <InfoRow label="First Name" value={firstName} />
        <InfoRow label="Last Name" value={lastName} />
        <InfoRow label="City" value={cityValue} />
        <InfoRow label="State" value={state} />
        <InfoRow label="Phone" value={formattedPhone} />
        <InfoRow label="Username" value={username} />
        <InfoRow label="Zip Code" value={zipCode} />
      </div>
    </>
  );
};