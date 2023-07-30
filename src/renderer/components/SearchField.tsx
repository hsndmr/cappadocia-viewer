import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { InputBaseProps } from '@mui/material/InputBase/InputBase';

export interface SearchFieldProps extends InputBaseProps {}

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '15ch',
    '&:focus': {
      width: '20ch',
    },
  },
}));

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (props: SearchFieldProps, ref) => {
    return (
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon
            sx={{
              color: 'gray',
            }}
          />
        </SearchIconWrapper>
        <StyledInputBase
          ref={ref}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          {...props}
        />
      </SearchContainer>
    );
  }
);

export default SearchField;
