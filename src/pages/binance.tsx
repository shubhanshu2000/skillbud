import { useEffect, useState } from "react";
import Accordion from "../components/accordion";

interface DogApiResponse {
  message: {
    [key: string]: string[];
  };
  status: string;
}

const Binance = () => {
  const [userCount, setUserCount] = useState(0);
  const [breeds, setBreeds] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const time = setInterval(() => setUserCount((prev) => prev + 1), 2000);
    return () => clearInterval(time);
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data: DogApiResponse = await response.json();

        // Filter breeds with non-empty arrays
        const filteredBreeds = Object.entries(data.message).reduce(
          (acc, [breed, subBreeds]) => {
            if (subBreeds.length > 0) {
              acc[breed] = subBreeds;
            }
            return acc;
          },
          {} as { [key: string]: string[] }
        );

        setBreeds(filteredBreeds);
      } catch (error) {
        console.error("Error fetching dog breeds:", error);
      }
    };

    fetchDogs();
  }, []);

  return (
    <>
      <nav className="mx-4">
        <ul className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAADACAYAAAAp3fniAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABEeSURBVHgB7d1ddhNJmsbxiJRNUchzkFYwYgXjWkGbC3DRczGwgjIrKFhBmRUAKyj3CoCLGdrFBe4VlGsH6hVYnrJpDrYyOt6Q0mVcUmZkZuSX9P+do4MB2Wl95KOIyDffVAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHTG6eGdn04/3PlJAQDaQ8J5ctg3ciOkAUAprVpAwtkovX/933Rk9u8++PRCAcCaajygF4VzgpAGsM4aDei0cE4Q0gDWVWMB7RPOCUIawDpqJKDzhHOCkAawbmoP6CLhnCCkAayTWgO6TDgnCGkA66K2gA4RzglCGsA6qCWgQ4ZzgpAGsOoqD+gqwjlBSANYZZUGdJXhnCCkAayqygK6jnBOENIAVlElAV1nOCcIaQCrJnhANxHOCUIaWG0nbwYD1b8Y2S+3ldGjr/4zMhMVR2P5c/jg7EitgKABXTacjVJ/kz/tL/WDKqhtIX16uPXSaLOtQjFmolU0jrX5zf7tePjw/FgF4vO7Dh6e31eeTj5s7WhjlreOtY9lsPvpiQrg9Jf+z/b9M1JLN2X+Mdz9tK8qcPJLf08b9XPKXSbm0+a94ZPJRFUg+7FHr4e7v79VJWW+nrKt6ebT4aPJWAUk241U/BcT68dKgtmXVkfa6OM43nhd9Hea/NL/qGqmtT6+++DsuXy9oQIpPXKOzNvhg0978uXJYb9wSNsXcf/0wx3VlpB2gWfUjgpG2x9nn2kz+9vksD/WOn4VT795V3bHCP67GjNK/3lanX7ov7z74Py5Kr0pt53Rsv+PtB6ritjXIqt/+UDduXxm/9xXFch67FrF2yfvB8elgzPz9Qzr6gMhNjumyFjS/q52X9nR0cUzG7RHRusXuUfWNT7ePzb5h0gFEGBZ49ic3Xqa/GW4e76XjKaLmIf0ujT9H9kR0iv7Jvx48vdvn6mOMbF69v+H/cIzpqadvN/aUSnhmLAfqz+q5gzs++ONWx7ogJP3t0cyctWx+RgsIO3PkZ8nsw37YTVSHVE6oIOE86fN+zenf4R0biOto5cyIlUdEyv1qks7zXVRz/h+uAxkRKiasx1tXbR+fzj95dsfda/3a1UjVzvb2LMfVr/KspTqgFIBXVU4Jwjp/GRE2sGQ7tQILyEjPdnhfe+ftX5btbbPVk4P+y9lNmjDuer3wUCOGXQhGwoHdNXhnCCk85MdseHRWhGdGOFdF/V6+X5fOyq0I7dwB4wLaOtsZX6gs9YlOsmGto+kCwd0rPQ9VZxXOCfKhnQcR41eOaYJTY/WinAfLB1aRzdFpuGx3lPNGrjjFS2arcxGzv4zkYDGarp5pFqscECXCM1c4Vx2e3aU/2K4e7av2koreR7Gnjd/LRitFWHX0X/qwnr0fOQ1UjlpbX5oQTiO2jJbkTXngiPnsdbqwBj9Wm4q0m/tk3uU5/tNbHMocElgaKXK7CQ0c5bEFQrnottrfTgrV/P99u7u+VOf+7od+/bFYx25sq5R5jfEboQXrE66JskI77uq6oZD0Er/+HVBlLdKS+58zWcr/xx+/69XqiGzNfzIf/t2MGOmNow/b7xa9t7w2kfczwkTzvIhcfeh3/5bROkqjhwj21LhnHd7XQjnvOS5Gz46PzC3Nr9TXiNqPVLdNIr6F6090OlK60zxk4+08q78qJSbrTQ4y9Ibkfdr7EbK55v3ho/O9tMyJNlHBrvn9+yHkATn+E8/6zJ62vaRcyJIHbRHaAYJZ9/trWI4Xze8P5nYAxyZn9pRZO6qjpI1ybauR2eW1s2WrdKMWnIQV6oZGqmecR9yszMDM7n9+fuzZ7mXReeDmetZ4X7WX8ufVVmXIAEtUkIzaDhnbS9POHetrOsrtzcyly7iWJ+qDmt6hLeIT2mdmarncppx2n1adBC3kdmK7vk9/rKDLRnMuKyI9YsuDtxSA1pK6SaH/V99g2xBaOYKZym1kZvydHN7ecNZ37n4uNoleGasuq2xEd4yUbSRdUbg2I3cYvUu9V4tOohb92xFPuS8TkSxB/1CBapbGungrHppQF+rc96WICsQ0rnDWd4ocisS0kXC2X653dk66c+X2Tt3lD6K64iRvvPF+/1QNaNM6rTcmPi1++KbzYPMpY7mS+6uyFmotX1g6J7f0sZ0o7KDb12xMKAXnISSP6QLhHPy9yIhXSScr7bXsZB2jyEyWc/POGSnu8pkr9fKnR63YT3aq7TOfOPWN+fHCVIPZtdWcuf1HLumT7XMVnSk/ifzPloddOVAXpX+FNApZwjmC+mC4ZzIG9I+FoXz1fY6ENLy+5986D+zj+FXlREUdordib7YxkReoyQ3wmv4wFpWeeefQsWorINRA/XtxZ6qmJRySrdIj7uOdP/ijaqax/JGrHXhE9NWyVd10B6nbychHeSg37JwTsxDWoWoM0wL56vtNdCqVM5Gy+w5O+tNYG8XIzlXN/tn6td2ze1AdUHcO7bLAs91T2UeqNKx+bmp+uiT/+1ntmK9GSr2NTiSNpdp32dHkxL6r1TFzMatp/rLhbz3R+l3tGvjdrZSVX20ex6zdabhvmSUPU63pwIwkb5/83FfjaBz9NbINZJeJiucEyFG0j7hfLW9+kfSswMmabfZ7z3y+WGyHi8lSapDhn89f+VZS1/PCG+BaFNlHxxcECoeBwu365gZuCUXrZ74LHdUOlvZiEaZ99G6/UtzNXEBXaDxUamQ9g3nRJmQzhPOV9vr4oFDOTvKqOeyHq+66NamfKiMM+9nP7Dqfm28SuuWLSl5HCysq+ROjkmYS7+lLzdbqeKUex1nZobufvVRMFGJrnTbReon84ZzomhI6y1XAZD76HTnQtrYEIjUpKt9lWcH1ab3fUZ4rgtZnevRXlUHi5vu+BwsdMsKNb1ubrYivSuyjXTvInz1zM3rCC7Q9fr9kKIynd7iAtehKfI9f3yv/qfKyZR4sTvWBW8kPW5dH4uONCO/afjo87jxEd6iben05Y3MioOpOVBZoss9VZdvNvZVU7MVY2o/ftBlkRRwy1k2Kie31llgOl13V7qV7YK33GjWjLx7V1YRjY/wbvAprYunm6n7z/C/z48zzyxU5se6TshpdLYSZW+zyy0KQnNr0HlDumg4J/KGZunTPWveXhu4K6sELlOsjYzwtEcXPjfCq/aDKLNzopzt5lGvK1fWzrhLLSV3CTdbkVPSPdjZyptgsxUTZX8oFFiSXFVXZXYS0ifvt5SOMi6rXjKcr7YnrUP/vjXROv1imqHC0rdVaQPhfGy3+c773kbacar/snv8TuZdZ6fw/tZkS8kiZIRnD8w9mV+bLnVUOb96zDtZOwvNp7ROrnSdWSbp7udxcGx2Akdtr5Wckm73we2sfVDNL0lmn2GfmU26+OJYRb30+5j8fbYb42YhgapOFiz/fFUHnRXSocL5anvfnz2z25ss317YsMwK6SZGznb98njwMP82XT8DtbGX9YHqGg69GRy0ubfyIjLCO3nff25DK3MWICM8d2QjcEZLaZ3J/pmjYIEiBwvtckKdNcCyD9oPmL9IuV/GXbft0lnp9Wh5Xe32JhkfvIO6n4eiXD/3h2f19YNettyRN5y9zzhcur1qutKF6ILXBvJGd89d9nrtQPWnHlUI7eOaDvmtRw9U4AuN5r0gbChNdLkz06lXfbRSwUa2mSNOHcdZo/q1sLAXx83QzBvOsvaZ67TwP22vQFe6mrrgtc7siHy6uHhz+aa5k250A1eF6fV2VBNkFF1z9z63Hu15yn0ImSfvOPpxV0tGQ1razS4JzSLhPB95bBcJ6cJd6WrogtdGsl6rMkum4pHqsBwjvGBCTOcLm10Sq1bD3d/fes5WypOTdzyErtLpYv/31H7Qsx6qhcI5kTukS3Wlq7ALXqvp9Om9jqJOly3NKg70E1WToheEDaXOkrvr5rOVI1UxN6jw2U7AOmy5OK00GevaqDzYFVVSzhAM0rvjutSudBV0wWuzeaVB50YGeUnjoSL1+kVo/4sgV6XWkrvr7Gxl4XX8wm/H77UMcUbv6WH/5fzitCN3IleHQjpIQHucvh0spL260q1JSLvnYkNlNg8ycbwSp87KDKvqEZ7X1T5myy3jkrf0TXj0TK6Cm614XO+y/HbOjjxboM5C2u7PeYNVKkHkilB2KfP6klGnQnpDlZSjt0bpVqW5utIFbFXaNvLmija+/GDMxTOv0bOO6j/IVhEZ4emoJ++BkapA1Ov9lFVaZ6ab35VtJu9qp9M+CBoouUtIeJ6833qRVcJZlrmUNrO9HZ/3sOzPNlhlyeMgvrz1t7TnX543Vw0TLz1XIAnp+22/KECpgC7Q+KhwSBfqSteBkLZZ8Nh+yu/k+JaRUhcyqvD/jtW49JUzq4/esiFtsk8OycmrtM7zzMEsMsW3j2En7T7zkrsj1QCZrczro3dURdxrefgfT7WKfVvIjmQ0bcN13+4zx3LNTa2isfsfbQZGarm13T9i4zNTDxLSIftBXzfYPXc7eOEljqJd6VSB5Y4i4Zxo/XLHbPQwynHLa9yV5ue+3Hq052nKuXiU1pmpyd3XZRE3xc+qTGmg5O6rzW9uyoHZsaqQqx4pdmxhW0rxjDLP3G1eOZbzeIwN6S+t7llTOKDjaf7Octd4h3SZcE4U6YK3KlyT9hUkTZVCr0d7lNa5K3arQOwoOrusrYGSu8RVk/+qt1OwYVsAx+bTrVYvgRYO6ABPamZIhwjnVWh8VJR77F24cGxBIUd4PqV1OvQBytsbr7Lu0lTJXcI1+a9itnJzO3WHtF2qynNh66aUquKoMqQJ53JmV1dZ7ccecoTnU1qX1VY0L8964MZK7hJutuJZcVFqOy5PVOVlfpILg4dnrQ9nUbrMroqQJpxLkJFBrO8Pvz/PHJ2tghAjPJ/SOmPMuyqO+PvUAzdVcnedXHRW1VAf7fqvxNP7pkAPdw/Hbt/oUC4EqYMOE9Jfrg7kFb1MVWLtwtkebJKresibz40MHq3WQcEsOS46u5CU1mXeSfcOVAW8DxbWeYmvBfJcdLb0tqQRmLRiiKf3ggS1G7Sop4Pd8++6tm+UroNO+PaTXk4/Tqot7JP5WBXUtnCWxjBRFGbkYbQe6HnPWHfgU7uLax6HWmcO+bs6Uz3WvfTLPZnPgXZ4uejsxeV/LvvvODa/Lfr3k4+Dgbm4HKUuNdhQGj74vbIpvlzmS2/o9FHypRvhHy38fqPfpV2FJJ6qf6gA5H128n/99N/1c7gAl6C2f+zZGc6+Ur0dt91Z469R6jfOezSb2eM+KhPKMvBRDcpRTOvHhvR+1QXuy6zzmjOwLtxy6O3L2Qw70gN3pXA7GFA9O3iZbk7afvJJHsEDWjQR0oQzgFVTSUCLOkOacAawiioLaFFHSBPOAFZVpQEtqgxpwhnAKqs8oEUVIU04A1h1tQS0CBnShDOAdVBbQIsQIU04A1gXtQa0KBPShDOAdVJ7QIsiIU04A1g3jQS0yBPShDOAddRYQAufkCacAayrRgNapIU04QxgnTUe0GJRSBPOANASEtKTw76R28nh1r4CALSHhDThDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDHvwGK6vzkica1lwAAAABJRU5ErkJggg=="
              alt="logo"
              className="w-32"
            />
            <li>Buy Crypto</li>
            <li>Markets</li>
          </div>
          <div className="flex items-center gap-4">
            <li>Log In</li>
            <li>Sign Up</li>
          </div>
        </ul>
      </nav>
      <main className="w-4/5 mx-auto">
        <section className="flex justify-between">
          <div>
            <p className="text-7xl text-yellow-500 font-semibold">
              {userCount}
            </p>
            <p className="text-7xl">USERS</p>
            <p className="text-7xl">TRUST US</p>
            <div className="mt-4 ">
              <input
                className="text-xl px-4 py-2 border rounded-md"
                type="text"
                placeholder="Email/Phone number"
              />
              <button className="text-xl ml-2 bg-yellow-500 px-4 py-2 rounded-md">
                Get Started
              </button>
            </div>
          </div>

          <div className="w-2/5">
            <section className="bg-blue-200 p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <p>News</p>
                <p>View All News</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                fugit pariatur labore assumenda voluptatibus maxime? At, iste?
                Quia facilis illo et totam? Possimus, quis. Quas, velit unde!
                Repellendus quidem cumque odit beatae dolorem veritatis
                excepturi libero et ducimus unde quis sed saepe quisquam
                dignissimos quam voluptatum explicabo, iste deserunt, voluptatem
                quae pariatur animi omnis! Animi explicabo, illo laborum
                consequuntur laudantium eius esse eligendi quo sapiente quis ex
                cum debitis facere quas voluptas aliquam quidem qui optio
                consequatur, architecto ab nisi! Incidunt, odio architecto!
                Officia nisi commodi nihil porro ab ad eos reiciendis, minus,
                dolorem enim consequuntur adipisci expedita, excepturi
                architecto.
              </p>
            </section>
          </div>
        </section>
        <section className="mt-8 flex justify-between">
          <img src="/app-download.png" alt="app download" className="w-2/5" />
          <div>
            <p className="text-3xl font-semibold">
              Trade on the go. Anywhere, <br />
              anytime
            </p>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl text-center">Frequently Asked Question</h2>
          <Accordion />
        </section>

        <section className="mt-8">
          <h2 className="text-2xl text-center mb-6">
            Dog Breeds with Sub-breeds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(breeds).map(([breed, subBreeds]) => (
              <div
                key={breed}
                className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <h3 className="text-lg font-medium capitalize text-yellow-500">
                  {breed}
                </h3>
                <ul className="mt-2 space-y-1">
                  {subBreeds.map((subBreed) => (
                    <li
                      key={`${breed}-${subBreed}`}
                      className="text-gray-600 capitalize pl-4"
                    >
                      • {subBreed}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="mt-8 flex w-4/5 mx-auto gap-8">
        <div>
          <h4 className="font-semibold">About Us</h4>
          <ul className="text-sm">
            <li>About</li>
            <li>Careers</li>
            <li>News</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Products</h4>
          <ul className="text-sm">
            <li>Exchange</li>
            <li>Pay</li>
            <li>Academy</li>
            <li>Live</li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Binance;
