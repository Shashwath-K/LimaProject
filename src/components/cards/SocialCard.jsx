import React from 'react';
import styled from 'styled-components';

// Grid wrapper for all social cards
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 90px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

// Card styling
const Card = styled.div`
  position: relative;
  width: 380px;
  height: 220px; /* Increased height */
  padding: 24px;
  background: #20203aff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px;
  margin: 1px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    background: ${({ platform }) => platformColors[platform] || '#e2e8f0'};
  }

  .icon-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-30%, -30%);
    font-size: 36px;
    color: #fff;
    z-index: 1;
    transition: all 0.4s ease;
  }

  &:hover .icon-container {
    top: 20px;
    right: 20px;
    left: auto;
    transform: none;
    font-size: 28px;
  }

  .info {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px 16px 32px; /* More bottom padding */
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;

    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    .name {
      font-weight: 600;
      margin-bottom: 8px;
      color: #fff;
    }

    .visit-btn {
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      border: 1px solid white;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.3s ease;
      margin-top: 10px;

      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }

  &:hover .info {
    opacity: 1;
  }
`;

// Platform-specific background colors
const platformColors = {
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  linkedin: '#0077B5',
  github: '#333333',
  spotify: '#1DB954',
  discord: '#5865F2',
  youtube: '#FF0000',
};

// SocialCard component
const SocialCard = ({ icon, profileImg, name, link, platform }) => (
  <Card platform={platform} onClick={() => window.open(link, '_blank')}>
    <div className="icon-container">{icon}</div>
    <div className="info">
      <img src={profileImg} alt={`${name} profile`} />
      <div className="name">{name}</div>
      <button className="visit-btn">Visit</button>
    </div>
  </Card>
);

// Export Grid wrapper
export const SocialCardGrid = ({ children }) => <Grid>{children}</Grid>;

export default SocialCard;
