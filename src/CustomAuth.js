import React, { useState } from 'react';
import { signIn, signUp, confirmSignUp, resendSignUpCode } from '@aws-amplify/auth';
import './CustomAuth.css';

function CustomAuth({ onSuccess }) {
  const [screen, setScreen] = useState('login'); // 'login', 'signup', 'verify'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  // Verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [emailToVerify, setEmailToVerify] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { isSignedIn } = await signIn({
        username: loginEmail,
        password: loginPassword
      });
      
      if (isSignedIn) {
        onSuccess({ username: loginEmail });
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Check if user needs to verify email
      if (err.message.includes('not confirmed') || err.message.includes('User is not confirmed')) {
        setError('Your email is not verified. Please check your inbox for the verification code.');
        setEmailToVerify(loginEmail);
        setScreen('verify');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupPassword.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp({
        username: signupEmail,
        password: signupPassword,
        options: {
          userAttributes: {
            email: signupEmail
          }
        }
      });
      
      setEmailToVerify(signupEmail);
      setScreen('verify');
      setSuccess('Account created! Check your email for the verification code.');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await confirmSignUp({
        username: emailToVerify,
        confirmationCode: verificationCode
      });
      
      setSuccess('Email verified successfully! You can now sign in.');
      setScreen('login');
      setVerificationCode('');
      setLoginEmail(emailToVerify);
    } catch (err) {
      setError(err.message || 'Verification failed. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await resendSignUpCode({
        username: emailToVerify
      });
      setSuccess('Verification code resent! Check your email.');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyNow = () => {
    if (loginEmail.trim()) {
      setEmailToVerify(loginEmail);
      setScreen('verify');
      setError('');
      setSuccess('');
    } else {
      setError('Please enter your email address first');
    }
  };

  return (
    <div className="modern-auth-container">
      <div className="auth-icon">
        <div className="cloud-logo">☁️</div>
      </div>
      
      <h1 className="auth-title">SkyChat</h1>
      <p className="auth-welcome">
        {screen === 'login' && 'Welcome back! Sign in to continue'}
        {screen === 'signup' && 'Create your account'}
        {screen === 'verify' && 'Verify your email'}
      </p>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Login Form */}
      {screen === 'login' && (
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-wrapper">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="modern-input"
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="modern-input"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="modern-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Help section for unverified users */}
          <div className="help-section">
            <div className="help-text">
              Haven't verified your email?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={handleVerifyNow}
                disabled={loading}
              >
                Verify Now
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Sign Up Form */}
      {screen === 'signup' && (
        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-wrapper">
            <label className="input-label">Email</label>
            <input
              type="email"
              className="modern-input"
              placeholder="your@email.com"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="modern-input"
              placeholder="Min 8 characters"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              className="modern-input"
              placeholder="Confirm password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="modern-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      )}

      {/* Verification Form */}
      {screen === 'verify' && (
        <form onSubmit={handleVerification} className="auth-form">
          <p className="verify-info">
            We sent a verification code to <strong>{emailToVerify}</strong>
          </p>

          <div className="input-wrapper">
            <label className="input-label">Verification Code</label>
            <input
              type="text"
              className="modern-input"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              disabled={loading}
              maxLength={6}
            />
          </div>

          <button type="submit" className="modern-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <button
            type="button"
            className="resend-btn"
            onClick={handleResendCode}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Code'}
          </button>
        </form>
      )}

      {/* Footer */}
      <div className="auth-footer">
        {screen === 'login' && (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setScreen('signup');
                setError('');
                setSuccess('');
              }}
            >
              Create Account
            </button>
          </>
        )}
        {screen === 'signup' && (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setScreen('login');
                setError('');
                setSuccess('');
              }}
            >
              Sign In
            </button>
          </>
        )}
        {screen === 'verify' && (
          <>
            Want to use a different email?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setScreen('signup');
                setError('');
                setSuccess('');
                setVerificationCode('');
              }}
            >
              Back to Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomAuth;
