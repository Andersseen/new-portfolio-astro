## ADDED Requirements

### Requirement: Contact form is reachable from the Social card
The system SHALL expose the existing contact form inside the Social modal; there
is no separate Contact grid card.

#### Scenario: Social card opens the contact form
- **WHEN** the user clicks or presses Enter on the Social grid card
- **THEN** the shared-element modal opens and shows the SocialCanvas content,
  including the contact form

### Requirement: Contact form collects required fields
The system SHALL provide input fields for name, email and message inside the
Social modal.

#### Scenario: Form fields are labeled
- **WHEN** a screen reader focuses the name, email or message field
- **THEN** it reads the corresponding visible label

#### Scenario: Placeholders guide input
- **WHEN** the user views the empty form
- **THEN** each field shows a placeholder hint

### Requirement: Form submits to the send-email endpoint
The system SHALL POST the form data to `/api/send-email`.

#### Scenario: Valid form triggers API call
- **WHEN** the user submits a valid form
- **THEN** the browser sends a POST request to `/api/send-email` with JSON body
  `{ name, email, message }`

#### Scenario: Loading state is shown during submission
- **WHEN** the form is submitting
- **THEN** the submit button shows a loading indicator and is disabled

### Requirement: Form surfaces success and error states
The system SHALL display a success indicator when the API returns 200 and an
error message when it returns 400 or 500.

#### Scenario: Successful submission
- **WHEN** the API responds with 200
- **THEN** the submit button shows a success state

#### Scenario: API error
- **WHEN** the API responds with 400 or 500
- **THEN** an error alert appears and the user can retry

### Requirement: Contact form has automated test coverage
The system SHALL include Playwright tests that open the Social modal, submit the
form with mocked success and mocked error responses, and assert the resulting
UI state.

#### Scenario: Mocked successful submission
- **WHEN** the test fills and submits the form with `/api/send-email` mocked to
  return 200
- **THEN** the form shows a success indicator

#### Scenario: Mocked API error
- **WHEN** the test fills and submits the form with `/api/send-email` mocked to
  return 500
- **THEN** the form shows an error message
