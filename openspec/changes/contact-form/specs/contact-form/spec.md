## ADDED Requirements

### Requirement: Contact card opens the contact modal
The system SHALL render a "Contact" card in the portfolio grid that opens the contact form modal when activated.

#### Scenario: Contact card is visible and interactive
- **WHEN** the portfolio grid loads
- **THEN** a contact card is present and clickable/focusable like the other grid cards

#### Scenario: Contact modal opens from the card
- **WHEN** the user clicks or presses Enter on the contact card
- **THEN** the shared-element modal opens and shows the contact form

### Requirement: Contact form collects required fields
The system SHALL provide input fields for name, email and message.

#### Scenario: Form fields are labeled
- **WHEN** a screen reader focuses the name, email or message field
- **THEN** it reads the corresponding visible label

#### Scenario: Placeholders guide input
- **WHEN** the user views the empty form
- **THEN** each field shows a placeholder hint

### Requirement: Client-side validation mirrors the API contract
The system SHALL validate name (1–100 characters), email (valid format, ≤254 characters) and message (1–5000 characters) before submitting.

#### Scenario: Empty fields show errors
- **WHEN** the user submits the form with empty fields
- **THEN** field-level errors appear and focus moves to the first invalid field

#### Scenario: Oversized fields show errors
- **WHEN** the user enters a name longer than 100 characters or a message longer than 5000 characters
- **THEN** the corresponding field shows a length error and the form does not submit

#### Scenario: Invalid email shows an error
- **WHEN** the user enters a malformed email address
- **THEN** the email field shows an invalid-format error and the form does not submit

### Requirement: Honeypot field blocks simple spam
The system SHALL include an invisible honeypot field that aborts submission if filled.

#### Scenario: Honeypot is hidden from users
- **WHEN** the form is rendered
- **THEN** the honeypot field is not visible, not focusable and ignored by screen readers

#### Scenario: Honeypot submission is rejected silently
- **WHEN** the honeypot field contains a value on submit
- **THEN** the form does not call the API and returns to an idle state without showing success

### Requirement: Form submits to the send-email endpoint
The system SHALL POST the sanitized form data to `/api/send-email`.

#### Scenario: Valid form triggers API call
- **WHEN** the user submits a valid form
- **THEN** the browser sends a POST request to `/api/send-email` with JSON body `{ name, email, message }`

#### Scenario: Loading state is shown during submission
- **WHEN** the form is submitting
- **THEN** the submit button shows a loading indicator, is disabled and inputs are disabled

### Requirement: Form surfaces success and error states
The system SHALL display a success message when the API returns 200 and an error message when it returns 400 or 500.

#### Scenario: Successful submission
- **WHEN** the API responds with 200
- **THEN** the form is replaced by a success message and focus moves to that message

#### Scenario: API error
- **WHEN** the API responds with 400 or 500
- **THEN** an error alert appears, focus moves to the alert and the user can retry

### Requirement: Contact form is fully keyboard operable
The system SHALL keep focus inside the modal and allow the form to be filled and submitted using only the keyboard.

#### Scenario: Tab navigation loops inside the modal
- **WHEN** the user presses Tab or Shift+Tab inside the contact modal
- **THEN** focus stays within the modal and cycles through focusable elements

#### Scenario: Form submits on Enter from submit button
- **WHEN** the submit button has focus and the user presses Enter
- **THEN** the form submits

### Requirement: Contact form content is translated
The system SHALL display all contact form text in the active locale.

#### Scenario: Spanish locale
- **WHEN** the user views `/es/`
- **THEN** all contact labels, placeholders, button text and messages are in Spanish

#### Scenario: Ukrainian locale
- **WHEN** the user views `/ua/`
- **THEN** all contact labels, placeholders, button text and messages are in Ukrainian
