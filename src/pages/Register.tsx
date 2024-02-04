import { useState } from "react";
import { isEmailValid } from "../utils/validations";
import { TextInput } from "../TextInput";
import {
  PhoneNumberState,
  FunctionalPhoneInput,
} from "../utils/TelephoneInput";
import { UserInformation } from "../types";
import { isCityValid } from "../utils/all-cities";
import { stateAcronyms } from '../utils/state-acronyms';
import { StateDropdown } from '../utils/StateDropdown';
import { ZipCodeInput } from '../utils/zipcodeInput';
import { isZipCodeValid } from '../utils/validations';
import { isValidPhoneNumber } from "../validations";
import { registerUser } from "../services/apiService";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const stateErrorMessage = "Please select a valid state.";
const zipCodeErrorMessage = "Please enter a valid zip code.";
const phoneNumberErrorMessage = "Invalid Phone Number";
const usernameErrorMessage = "Username must be at least 3 characters long";
const passwordErrorMessage = "Password must be at least 6 characters long";

export const FunctionalForm = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<PhoneNumberState>([
    "",
    "",
    "",
    "",
  ]);
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedState, setSelectedState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const reset = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setCityInput("");
    setSelectedState("");
    setZipCode('');
    setPhoneNumberInput(["", "", "", ""]);
    setUsernameInput("");
    setPasswordInput("");
    setIsSubmitted(false);
  };

  const onSelectState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  const isFirstNameInputValid = firstNameInput.length >= 2;
  const isLastNameInputValid = lastNameInput.length >= 2;
  const isEmailInputValid = isEmailValid(emailInput);
  const isCityInputValid = isCityValid(cityInput);
  const isStateValid = stateAcronyms.includes(selectedState);
  const zipCodeIsValid = isZipCodeValid(zipCode)
  const isPhoneNumberValid = isValidPhoneNumber(phoneNumberInput.join(""));
  const isUsernameValid = usernameInput.length >= 3;
  const isPasswordValid = passwordInput.length >= 6;

  const onSubmit = async () => {
    setIsSubmitted(true);
    if (
      isFirstNameInputValid &&
      isLastNameInputValid &&
      isEmailInputValid &&
      isCityInputValid &&
      isStateValid &&
      zipCodeIsValid &&
      isPhoneNumberValid &&
      isUsernameValid &&
      isPasswordValid
    ) {
      const newUser: UserInformation = {
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        phone: phoneNumberInput.join(""),
        city: cityInput,
        state: selectedState,
        zipCode: zipCode,
        username: usernameInput,
        password: passwordInput,
      };

      try {
        await registerUser(newUser);
        setSuccessMessage("Account created successfully!");
        reset();
      } catch (error) {
        console.error("Registration failed", error);
      }
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      <TextInput
        label="Username"
        inputProps={{
          placeholder: "Username",
          value: usernameInput,
          onChange: (e) => setUsernameInput(e.target.value),
        }}
        shouldShowError={isSubmitted && !isUsernameValid}
        errorMessage={usernameErrorMessage}
      />

      <TextInput
        label="Password"
        inputProps={{
          type: "password",
          placeholder: "Password",
          value: passwordInput,
          onChange: (e) => setPasswordInput(e.target.value),
        }}
        shouldShowError={isSubmitted && !isPasswordValid}
        errorMessage={passwordErrorMessage}
      />

      <TextInput
        label="First Name"
        inputProps={{
          placeholder: "First Name",
          value: firstNameInput,
          onChange: (e) => setFirstNameInput(e.target.value),
        }}
        shouldShowError={isSubmitted && !isFirstNameInputValid}
        errorMessage={firstNameErrorMessage}
      />

      <TextInput
        label="Last Name"
        inputProps={{
          placeholder: "Last Name",
          value: lastNameInput,
          onChange: (e) => setLastNameInput(e.target.value),
        }}
        shouldShowError={isSubmitted && !isLastNameInputValid}
        errorMessage={lastNameErrorMessage}
      />

      <TextInput
        label="Email"
        inputProps={{
          placeholder: "name@email.com",
          value: emailInput,
          onChange: (e) => setEmailInput(e.target.value),
          autoComplete: "on",
        }}
        shouldShowError={isSubmitted && !isEmailInputValid}
        errorMessage={emailErrorMessage}
      />

      <TextInput
        inputProps={{
          placeholder: "City",
          value: cityInput,
          onChange: (e) => setCityInput(e.target.value),
          list: "cities",
        }}
        errorMessage={cityErrorMessage}
        shouldShowError={isSubmitted && !isCityInputValid}
        label="City"
      />

      <StateDropdown
        selectedState={selectedState}
        onSelectState={onSelectState}
        shouldShowError={isSubmitted && !isStateValid}
        errorMessage={stateErrorMessage}
      />

      <ZipCodeInput
        zipCode={zipCode}
        onZipCodeChange={handleZipCodeChange}
        shouldShowError={isSubmitted && !zipCodeIsValid}
        errorMessage={zipCodeErrorMessage}
      />

      <FunctionalPhoneInput
        errorMessage={phoneNumberErrorMessage}
        shouldShowError={isSubmitted && !isPhoneNumberValid}
        phoneNumberInput={phoneNumberInput}
        setPhoneNumberInput={setPhoneNumberInput}
      />

      {/* Success message display */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};

export default FunctionalForm;