import { Button, Modal, Input } from "@lidofinance/lido-ui";
import { useState } from "react";
import { useSelector } from 'react-redux';

function MintModal({ open, onClose, onMint }) {
  const inviterAddressUrl = useSelector((state) => state.user.inviterAddress);
  const [inviterAddress, setInviterAddress] = useState(inviterAddressUrl);

  const handleInputChange = (e) => {
    setInviterAddress(e.target.value);
  };

  const handleMintClick = () => {
    onMint(inviterAddress || null);
  };

  return (
    <Modal open={open} onClose={onClose} title="Do you have a inviter address?">
      <div>
        <div className="flex items-center mb-4">
          <Input
            variant="small"
            fullwidth
            value={inviterAddress}
            onChange={handleInputChange}
            placeholder="Enter inviter address"
            label="Email address"
            rightDecorator={<Button size="xs" onClick={handleMintClick}>Mint</Button>}
            themeOverride="light"
          />
        </div>
        <div className="flex justify-center">
          <button className="text-xs flex items-center" onClick={() => onMint(null)}>
            I don't have an inviter, just mint <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default MintModal;