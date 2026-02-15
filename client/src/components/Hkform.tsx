const Hkform = () => {
  return (
    <>
      <form className="relative">
        <input
          type="text"
          id="name"
          placeholder=" "
          className="peer border-amber-200 border-2 p-2.5 rounded-md w-full focus:outline-none placeholder-transparent"
        />
        <label
          htmlFor="name"
          className="absolute left-3 px-1 text-sm
          transition-all duration-300
          pointer-events-none
          peer-placeholder-shown:top-2.5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:-top-2
          peer-focus:text-amber-500
          peer-focus-visible:top-0"
        >
          Name:
        </label>
      </form>
    </>
  );
};

export default Hkform;
