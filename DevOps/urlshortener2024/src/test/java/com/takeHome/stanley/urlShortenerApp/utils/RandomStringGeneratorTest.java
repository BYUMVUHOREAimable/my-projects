package com.takeHome.stanley.urlShortenerApp.utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RandomStringGeneratorTest {
    RandomStringGenerator generator;

    @BeforeEach
    public void setup(){
        generator = new RandomStringGenerator();
    }
    @Test
    void shouldGenerateStringWithAtLeastSixCharactersWhenLengthIsLessThanSix() {

        String result = generator.generateRandomAlphanumericString(3);

        assertNotNull(result);
        assertEquals(6, result.length(), "Generated string should be at least 6 characters long.");
    }
    @Test
    void shouldGenerateStringWithExactLength() {

        int length = 10;
        String result = generator.generateRandomAlphanumericString(length);

        assertNotNull(result);
        assertEquals(length, result.length(), "Generated string should have the exact length requested.");
    }
    @Test
    void shouldGenerateStringWithAtLeastOneLetterAndOneDigit() {

        String result = generator.generateRandomAlphanumericString(10);

        boolean hasLetter = result.chars().anyMatch(Character::isLetter);
        boolean hasDigit = result.chars().anyMatch(Character::isDigit);

        assertTrue(hasLetter, "Generated string should contain at least one letter.");
        assertTrue(hasDigit, "Generated string should contain at least one digit.");
    }
    @Test
    void shouldGenerateDifferentStringsOnConsecutiveCalls() {

        String result1 = generator.generateRandomAlphanumericString(8);
        String result2 = generator.generateRandomAlphanumericString(8);

        assertNotEquals(result1, result2, "Consecutive calls should generate different strings.");
    }
    @Test
    void shouldShuffleTheGeneratedString() {

        String result = generator.generateRandomAlphanumericString(8);

        // Ensure that the positions of the letter and digit are not fixed (e.g., not always in positions 0 and 1)
        String firstTwoChars = result.substring(0, 2);
        boolean allLettersOrDigits = firstTwoChars.chars().allMatch(Character::isLetterOrDigit);

        assertTrue(allLettersOrDigits, "Generated string should have shuffled positions of characters.");
    }
    @Test
    void shouldGenerateStringWithLargeLength() {

        int largeLength = 100;
        String result = generator.generateRandomAlphanumericString(largeLength);

        assertNotNull(result);
        assertEquals(largeLength, result.length(), "Generated string should match the large length requested.");
    }
    @Test
    void shouldDefaultToSixWhenNegativeLengthIsGiven() {

        String result = generator.generateRandomAlphanumericString(-5);

        assertNotNull(result);
        assertEquals(6, result.length(), "Generated string should default to 6 characters when a negative length is provided.");
    }
    @Test
    void shouldDefaultToSixWhenZeroLengthIsGiven() {

        String result = generator.generateRandomAlphanumericString(0);

        assertNotNull(result);
        assertEquals(6, result.length(), "Generated string should default to 6 characters when zero length is provided.");
    }
    @Test
    void shouldGenerateStringWithAtLeastOneLetterAndOneDigitWhenLengthIsExactlySix() {

        String result = generator.generateRandomAlphanumericString(6);

        boolean hasLetter = result.chars().anyMatch(Character::isLetter);
        boolean hasDigit = result.chars().anyMatch(Character::isDigit);

        assertEquals(6, result.length(), "Generated string should have exactly 6 characters.");
        assertTrue(hasLetter, "Generated string should contain at least one letter.");
        assertTrue(hasDigit, "Generated string should contain at least one digit.");
    }
}