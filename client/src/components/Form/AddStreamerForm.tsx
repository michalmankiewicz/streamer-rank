import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
  SelectChangeEvent,
  CircularProgress,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import useHttp from '../../hooks/useFetchData';
import { BASE_URL_STREAMERS } from '../../constants';
import FormField from './FormField';

type Props = {
  socket: Socket;
};

function AddStreamerForm({ socket }: Props) {
  const theme = useTheme();
  const { isLoading, isError, sendRequest: createStreamer } = useHttp();

  const [nickname, setNickname] = useState<string>('');
  const [platform, setPlatform] = useState<string>('');
  const [description, setDescription] = useState<String>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isNicknameError = nickname.trim().length < 2 || nickname.trim().length > 20;
  const isPlatformError = platform.trim().length === 0;
  const isDescriptionError = description.trim().length < 3 || nickname.trim().length > 500;

  const canSubmit = !isNicknameError && !isPlatformError && !isDescriptionError;

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const handlePlatformChange = (e: SelectChangeEvent) => setPlatform(e.target.value);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!canSubmit) return;

    await createStreamer(BASE_URL_STREAMERS, 'POST', {
      nick: nickname,
      platform: platform,
      description: description,
    });
    socket.emit('streamerAdded');

    setNickname('');
    setDescription('');
    setPlatform('');
    setIsSubmitted(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{ backgroundColor: '#fff', p: 2 }}
      borderRadius={theme.shape.borderRadius}
      component="form"
      gap={2}
      onSubmit={handleFormSubmit}
    >
      <FormField
        showError={isSubmitted && isNicknameError}
        errorMessage="Nickname should contain from 2 to 20 characters"
      >
        <TextField
          required
          onChange={handleNicknameChange}
          fullWidth
          id="nick"
          label="Nick"
          variant="filled"
          color="primary"
          size="small"
          value={nickname}
        />
      </FormField>

      <FormField
        showError={isSubmitted && isPlatformError}
        errorMessage="Platform can not be empty"
      >
        <InputLabel id="platform">Platform</InputLabel>
        <Select
          required
          variant="filled"
          fullWidth
          labelId="platform"
          id="platform"
          label="Platform"
          size="small"
          value={platform}
          onChange={handlePlatformChange}
        >
          <MenuItem value="YouTube">YouTube</MenuItem>
          <MenuItem value="Twitch">Twitch</MenuItem>
          <MenuItem value="TikTok">TikTok</MenuItem>
          <MenuItem value="Kick">Kick</MenuItem>
          <MenuItem value="Rumble">Rumble</MenuItem>
        </Select>
      </FormField>

      <FormField
        showError={isSubmitted && isDescriptionError}
        errorMessage=" Nickname should contain from 3 to 500 characters"
      >
        <TextField
          required
          fullWidth
          multiline
          id="description"
          label="Description"
          variant="filled"
          size="small"
          value={description}
          onChange={handleDescriptionChange}
        />
      </FormField>

      <Button type="submit" variant="contained" sx={{ height: '2.6rem' }}>
        {isLoading ? <CircularProgress size={10} sx={{ color: 'white' }} /> : 'Submit'}
      </Button>
      {isError && (
        <Typography textAlign="center" color="red">
          Something went wrong!
        </Typography>
      )}
    </Box>
  );
}

export default AddStreamerForm;
