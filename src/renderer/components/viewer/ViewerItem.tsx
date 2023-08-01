import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { JSONTree } from 'react-json-tree';
import { Viewer } from '../../store/Viewer';
import JsonView from '../JsonView';

export interface BaseViewerItemProps {
  viewer: Viewer;
}

interface ViewerItemProps extends BaseViewerItemProps {
  render: (props: { viewer: Viewer }) => ReactElement;
}

export default function ViewerItem({
  viewer,
  render: Component,
}: ViewerItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        sx={{
          minHeight: 100,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <Typography>
            {dayjs(viewer.timestamp).format('DD.MM.YYYY h:mm')}
          </Typography>
        </Box>
        <Stack>
          {viewer.hasBadge && (
            <Box>
              <Chip
                size="small"
                label={viewer.badge}
                color={viewer.badgeColor}
                variant="outlined"
              />
            </Box>
          )}
          <Component viewer={viewer} />
          {viewer.hasContext && <JsonView data={viewer.context} />}
        </Stack>
      </Stack>
    </motion.div>
  );
}
