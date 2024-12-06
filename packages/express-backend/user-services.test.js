import userServices from './user-services.js';
import bcrypt from 'bcrypt';
import userModel, { saveMock } from './user.js';
import mongoose from 'mongoose';

// Mock user model
jest.mock('./user.js', () => {
    const saveMock = jest.fn().mockResolvedValue({
      email: 'test@calpoly.edu',
      password: 'hashed_password',
    });
  
    const userModelMock = jest.fn((data) => {
      console.log('Mock userModel instantiated with:', data); // Debug instantiation
      return {
        save: saveMock,
      };
    });
  
    return {
      __esModule: true,
      default: userModelMock,
      saveMock,
    };
  });
  

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('userService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress logs
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await mongoose.disconnect(); // Ensure database connection is closed
  });

  describe('addUser', () => {
    it('should hash the password and save the user', async () => {
      const user = { email: 'test@calpoly.edu', password: 'plaintext' };
      const hashedPassword = 'hashed_password';
  
      bcrypt.hash.mockResolvedValueOnce(hashedPassword); // Mock bcrypt.hash
  
      const result = await userServices.addUser(user);
  
      console.log('bcrypt.hash calls:', bcrypt.hash.mock.calls); // Debug bcrypt.hash
      console.log('saveMock calls:', saveMock.mock.calls); // Debug saveMock
  
      // Assertions
      expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 10); // Ensure correct arguments
      expect(saveMock).toHaveBeenCalled(); // Ensure saveMock was called
      expect(result).toEqual({ email: user.email, password: hashedPassword }); // Verify result
    });
  });
});
