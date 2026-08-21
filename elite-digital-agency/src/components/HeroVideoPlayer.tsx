import React from 'react';
import { LahariVideoBackground } from './LahariVideoBackground';
import { AgencySettings } from '../types';
import { SupportedLanguage } from '../data/skillTranslations';

interface HeroVideoPlayerProps {
  settings: AgencySettings;
  onUpdateSettings?: (settings: AgencySettings) => void;
  currentLanguage?: SupportedLanguage;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = (props) => {
  return <LahariVideoBackground {...props} />;
};

export { LahariVideoBackground };

