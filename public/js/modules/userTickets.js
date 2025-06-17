import MainPageRequest from "../services/MainPageRequests";

function ticketsListGenerator() {
    
    class TicketsListGenerator {
        constructor(data) {
            this.id = data.id;
            this.seats = data.seats;
            this.parent = document.querySelector('.userTicketsBOX');
        }
        render() {
            const element = document.createElement('div');
            element.style.height = '220px';
            element.innerHTML = `
                <div class="search__movieDescr" style="position: relative">
                <img src="icons/ticket.png" style="max-height: 200px; border-radius: 10px; position: absolute" loading="lazy">
                    <span class="position__nameRus" id="spaaan">
                        ${this.id}
                    </span>
                </div>
            `;
            this.parent.append(element);
        }
    };

    MainPageRequest('/api/getTickets', TicketsListGenerator);
};

export default ticketsListGenerator;