int ledPin = 13; 

void setup() {
  Serial.begin(9600); // Set the baud rate to match Python script
  pinMode(ledPin, OUTPUT); // Set LED pin as output
}

void loop() {
  if (Serial.available() > 0) { // Check if data is available to read
    char received = Serial.read(); // Read the received byte
    if (received == '1') { // If the received byte is '1'
      digitalWrite(ledPin, HIGH); // Turn on the LED
      delay(10); // Keep the LED on for 500ms
      digitalWrite(ledPin, LOW); // Turn off the LED
    }
  }
}
