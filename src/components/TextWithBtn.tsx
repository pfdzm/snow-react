import React, { useEffect, useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import Button from './Button';

const TextWithBtn: React.FC = () => {
  let query = useQuery();
  const id = query.get('id');
  const [magicId, setMagicId] = useState<string | undefined>();
  useEffect(() => {
    if (id) {
      setMagicId(id);
    }
  }, [id]);

  return (
    <>
      <h1>This is a title!</h1>
      {magicId ? <h3>Your magic id is {magicId}</h3> : null}
      <p>
        And this is some text! Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Sit molestias corrupti voluptatum, quas totam sequi
        sint, et vitae laboriosam dolor laborum consectetur quasi ipsa
        accusantium, blanditiis debitis eos amet officiis.
      </p>
      <Button>I'm a button!</Button>
    </>
  );
};

export default TextWithBtn;
