import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as DiscordIcon } from 'images/external/ic-discord.svg';
import { ReactComponent as TwitterIcon } from 'images/external/ic-twitter.svg';
import { ReactComponent as FacebookIcon } from 'images/external/ic-facebook.svg';
import { ReactComponent as InstagramIcon } from 'images/external/ic-instagram.svg';
import { ReactComponent as TumblrIcon } from 'images/external/ic-tumblr.svg';
import { ReactComponent as YoutubeIcon } from 'images/external/ic-youtube.svg';
import { ReactComponent as PixivIcon } from 'images/external/ic-pixiv.svg';
import { ReactComponent as DeviantartIcon } from 'images/external/ic-deviantart.svg';
import { ReactComponent as SoundcloudIcon } from 'images/external/ic-soundcloud.svg';
import { ReactComponent as TwitchIcon } from 'images/external/ic-twitch.svg';
import { ReactComponent as MiscIcon } from 'images/external/ic-misc.svg';

const urlRegexes = [
  { name: 'discord', regex: /(https?:\/\/)?(www\.)?(discord\.gg|discordapp\.com).*/ },
  { name: 'twitter', regex: /(https?:\/\/)?(www\.)?(twitter\.com).*/ },
  { name: 'facebook', regex: /(https?:\/\/)?(www\.)?(facebook\.com).*/ },
  { name: 'instagram', regex: /(https?:\/\/)?(www\.)?(instagram\.com).*/ },
  { name: 'tumblr', regex: /(https?:\/\/)?(www\.)?(tumblr\.com).*/ },
  { name: 'youtube', regex: /(https?:\/\/)?(www\.)?(youtube\.com).*/ },
  { name: 'pixiv', regex: /(https?:\/\/)?(www\.)?(pixiv\.net).*/ },
  { name: 'deviantart', regex: /(https?:\/\/)?(www\.)?(deviantart\.com).*/ },
  { name: 'soundcloud', regex: /(https?:\/\/)?(www\.)?(soundcloud\.com).*/ },
  { name: 'twitch', regex: /(https?:\/\/)?(www\.)?(twitch.tv).*/ },
];

const svg = {
  discord: DiscordIcon,
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tumblr: TumblrIcon,
  youtube: YoutubeIcon,
  pixiv: PixivIcon,
  deviantart: DeviantartIcon,
  soundcloud: SoundcloudIcon,
  twitch: TwitchIcon,
  misc: MiscIcon,
};

const ExternalFavicon = ({ url, ...props }) => {
  const [site, setSite] = useState('misc');

  useEffect(() => {
    urlRegexes.map(urlRegex => (
      urlRegex.regex.test(url) && setSite(urlRegex.name)
    ));

    return () => setSite('misc');
  }, [url]);

  const Icon = svg[site];

  return <Icon {...props} />;
};

ExternalFavicon.propTypes = {
  url: PropTypes.string,
};

export default ExternalFavicon;
