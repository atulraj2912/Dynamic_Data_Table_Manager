'use client';

import { useState, useEffect } from 'react';
import { Box, Fade, Paper, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export default function DragHelpTooltip() {
  const [showHint, setShowHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('dragHintDismissed');
    if (!hasSeenHint) {
      // Show hint after 2 seconds
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowHint(false);
    setDismissed(true);
    localStorage.setItem('dragHintDismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <Fade in={showHint} timeout={500}>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          p: 2,
          maxWidth: 350,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 4,
          zIndex: 1300,
          display: showHint ? 'block' : 'none',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              💡 Pro Tip: Drag & Drop Columns!
            </Typography>
            <Typography variant="body2">
              You can reorder columns by dragging the <strong>⋮⋮</strong> icon next to column headers.
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleDismiss}
            sx={{ color: 'inherit', mt: -0.5 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Fade>
  );
}
