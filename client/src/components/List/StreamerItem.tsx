import { Box, Typography, useTheme } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
  nick: string;
  votes: number;
  place: number;
  onHandleUpdateVote: (streamerId: string, voteType: 'upvotes' | 'downvotes') => void;
};

function StreamerItem(props: Props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleUpdatevote = (voteType: 'upvotes' | 'downvotes') => {
    props.onHandleUpdateVote(props.id, voteType);
  };

  return (
    <Box
      onClick={() => navigate(`/${props.id}`)}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: '#fff',
        borderRadius: theme.shape.borderRadius,
        p: 2,
        '&:hover': { backgroundColor: theme.palette.primary.light, cursor: 'pointer' },
      }}
    >
      <Box display="flex" gap={1} alignItems="flex-end">
        <Typography variant="h4" fontWeight="bold" color="primary">
          {props.place}.
        </Typography>
        <Typography variant="h5" fontWeight="bold" mb={0.3}>
          {props.nick}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <ThumbUp
          onClick={(e) => {
            e.stopPropagation();
            handleUpdatevote('upvotes');
          }}
          fontSize="large"
          sx={{ '&:hover': { color: theme.palette.primary.main, cursor: 'pointer' } }}
        />
        <Typography variant="h4" color="primary" fontWeight="bold">
          {props.votes}
        </Typography>
        <ThumbDown
          onClick={(e) => {
            e.stopPropagation();
            handleUpdatevote('downvotes');
          }}
          fontSize="large"
          sx={{ '&:hover': { color: theme.palette.primary.main, cursor: 'pointer' } }}
        />
      </Box>
    </Box>
  );
}

export default StreamerItem;
